import { Article } from '../entities/Article';
import { NewsRepository } from '../repositories/NewsRepository';

export class FetchArticlesUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute(source: string): Promise<Article[]> {
    return this.newsRepository.fetchArticles(source);
  }

  async fetchTopHeadlines(): Promise<Article[]> {
    return this.newsRepository.fetchArticles('top-headlines');
  }

  async fetchEverything(): Promise<Article[]> {
    return this.newsRepository.fetchArticles('everything');
  }
}