import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('renders the App component', async () => {
    // Render the component
    render(<App />);

    // Wait for the component to update
		await waitFor(() => {
      expect(screen.getByText('Article List')).toBeInTheDocument();
		}, { timeout: 3000 });
  });
});
