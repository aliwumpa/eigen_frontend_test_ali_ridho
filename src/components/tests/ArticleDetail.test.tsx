import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleDetail from '../articles/ArticleDetail';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';

describe('ArticleDetail', () => {
	const mockArticle = {
		id: '1',
		title: 'Test Article',
		description: 'Description of the test article.',
		urlToImage: 'test-image-url.jpg',
		content: 'Content of the test article.',
		publishedAt: '2022-03-01T12:34:56Z',
		url: 'https://www.washingtonpost.com/business/2024/02/29/oprah-winfrey-weightwatchers-board/',
	};

	it('renders article details correctly', async () => {
		render(<ArticleDetail article={mockArticle} />);


		// Check if the title, description, and content are rendered
		expect(screen.getByText('Test Article')).toBeInTheDocument();
		expect(screen.getByText('Description of the test article.')).toBeInTheDocument();
		expect(screen.getByText('Content of the test article.')).toBeInTheDocument();

        // Format the publication date
        const formattedDate = format(parseISO(mockArticle.publishedAt), 'MMM dd, yyyy');
        const expectedDateText = `Published At: ${formattedDate}`;

        // Check if the formatted publication date is rendered
        await waitFor(() => {
            expect(screen.getByText(expectedDateText)).toBeInTheDocument();
        }, { timeout: 3000 });

		// Check if the "Read More" link is rendered with the correct URL
		const readMoreLink = screen.getByText('Read More');
		expect(readMoreLink).toBeInTheDocument();
		expect(readMoreLink).toHaveAttribute('href', 'https://www.washingtonpost.com/business/2024/02/29/oprah-winfrey-weightwatchers-board/');
		expect(readMoreLink).toHaveAttribute('target', '_blank');
		expect(readMoreLink).toHaveAttribute('rel', 'noopener noreferrer');

		// Check if the image is rendered with the correct attributes
		const articleImage = screen.getByAltText('Test Article');
		expect(articleImage).toBeInTheDocument();
		expect(articleImage).toHaveAttribute('src', 'test-image-url.jpg');
		expect(articleImage).toHaveAttribute('width', '400');
		expect(articleImage).toHaveAttribute('height', '300');
	});

	it('renders nothing when article is null', () => {
		render(<ArticleDetail article={null} />);

		// Check that nothing is rendered when the article is null
		expect(screen.queryByText('Test Article')).not.toBeInTheDocument();
		expect(screen.queryByText('Description of the test article.')).not.toBeInTheDocument();
		expect(screen.queryByText('Content of the test article.')).not.toBeInTheDocument();
		expect(screen.queryByText('Published At: 01-Mar-2022')).not.toBeInTheDocument();
		expect(screen.queryByText('Read More')).not.toBeInTheDocument();
		expect(screen.queryByAltText('Test Article')).not.toBeInTheDocument();
	});
});