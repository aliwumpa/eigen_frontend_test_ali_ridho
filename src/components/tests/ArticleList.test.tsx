import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleList from '../articles/ArticleList';
import { FetchArticlesUseCase } from '../../domain/useCases/FetchArticlesUseCase';

jest.mock('../../domain/useCases/FetchArticlesUseCase');

const mockFetchTopHeadlines = jest.fn();
const mockFetchEverything = jest.fn();

beforeEach(() => {
	(FetchArticlesUseCase as jest.Mock).mockImplementation(() => ({
		fetchTopHeadlines: mockFetchTopHeadlines,
		fetchEverything: mockFetchEverything,
	}));
});

describe('ArticleList', () => {
	it('renders Top Headlines Article List', async () => {
		const handleArticleClickMock = jest.fn();

		const topHeadlinesData = [
			{
				id: '1',
				title: 'Top Headline 1',
				urlToImage: 'image1.jpg',
			},
			{
				id: '2',
				title: 'Top Headline 2',
				urlToImage: 'image2.jpg',
			},
		];

		// Mock the fetchTopHeadlines function
		mockFetchTopHeadlines.mockResolvedValueOnce(topHeadlinesData);

		// Render the component
		render(<ArticleList section="top-headlines" handleArticleClick={handleArticleClickMock}/>);

		// Wait for the component to update
		await waitFor(() => {
			expect(screen.getByText('Top Headlines Article')).toBeInTheDocument();
			expect(screen.getByAltText('Top Headline 1')).toBeInTheDocument();
			expect(screen.getByAltText('Top Headline 2')).toBeInTheDocument();
		}, { timeout: 3000 });
	});

	it('renders Everything Article List', async () => {
		const handleArticleClickMock = jest.fn();

		// Mock data for everything
		const everythingData = [
			{
				id: '3',
				title: 'Everything 1',
				urlToImage: 'image3.jpg',
			},
			{
				id: '4',
				title: 'Everything 2',
				urlToImage: 'image4.jpg',
			},
		];

		// Mock the fetchEverything function
		mockFetchEverything.mockResolvedValueOnce(everythingData);

		// Render the component
		render(<ArticleList section="everything" handleArticleClick={handleArticleClickMock}/>);
		await waitFor(() => {
			expect(screen.getByText('All Article')).toBeInTheDocument();
			expect(screen.getByAltText('Everything 1')).toBeInTheDocument();
			expect(screen.getByAltText('Everything 2')).toBeInTheDocument();
		}, { timeout: 3000 });
	});
});