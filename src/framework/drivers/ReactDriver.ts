import { NewsRepository } from '../../domain/repositories/NewsRepository';
import { NewsAPIGateway } from '../../infra/gateways/NewsAPIGateway';
import { Article } from '../../domain/entities/Article';

export class ReactDriver implements NewsRepository {
  private newsAPIGateway: NewsAPIGateway;

  constructor() {
    this.newsAPIGateway = new NewsAPIGateway();
  }

  async fetchArticles(source: string): Promise<Article[]> {
    return this.newsAPIGateway.fetchArticles(source);
  }
}