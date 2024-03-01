import { Article } from '../entities/Article';

export interface NewsRepository {
  fetchArticles(source: string): Promise<Article[]>;
}