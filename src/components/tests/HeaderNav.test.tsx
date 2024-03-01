import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderNav from '../header/HeaderNav';

describe('HeaderNav', () => {
  it('renders header navigation correctly', async () => {
    render(<HeaderNav />);

    // Check if the logo is rendered
    const logo = screen.getByAltText('news logo');
    expect(logo).toBeInTheDocument();

    // Check if the menu items are rendered
    await waitFor(() => {
        expect(screen.getByText('Top Headlines News')).toBeInTheDocument();
        expect(screen.getByText('Everything News')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});