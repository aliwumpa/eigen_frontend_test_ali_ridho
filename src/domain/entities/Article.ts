export interface Article {
    id: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    content: string;
    publishedAt: string;
    source?: string;
}