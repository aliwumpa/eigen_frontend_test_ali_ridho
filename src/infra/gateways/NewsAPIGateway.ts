import axios from 'axios';
import { NewsRepository } from '../../domain/repositories/NewsRepository';
import { Article } from '../../domain/entities/Article';

const apiKey = process.env.REACT_APP_NEWS_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export class NewsAPIGateway implements NewsRepository {
  async fetchArticles(source: string): Promise<Article[]> {
    let url = `${baseUrl}/${source}?apiKey=${apiKey}`;

    if (source === 'top-headlines') {
      url += '&country=us';
    } else if (source === 'everything') {
      url += '&q=placeholder';
    }

    const response = await axios.get(url);
    
    return response.data.articles.map((article: any) => {
      return { ...article, source };
    });
  }
}
