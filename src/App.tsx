import React, { useState } from 'react';
import './App.css';
import ArticleList from './components/articles/ArticleList';
import ArticleDetail from './components/articles/ArticleDetail';
import HeaderNav from './components/header/HeaderNav';
import HeaderBanner from './components/header/HeaderBanner';
import FooterComponent from './components/footer/FooterComponent';
import { Article } from './domain/entities/Article';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="news-app">
      <header className="news-app__header">
        <HeaderNav />
        <HeaderBanner />
      </header>
      <main>
        <ArticleDetail article={selectedArticle} />
        <h1>Article List</h1>
        <p className='note_paragraph'>
          Click one of these article to see article details
          <span className='fa fa-mouse-pointer'></span>
        </p>
        <section id='section__top-headlines' >
          <ArticleList section="top-headlines" handleArticleClick={setSelectedArticle} />
        </section>
        <section id='section__everything'>
          <ArticleList section="everything" handleArticleClick={setSelectedArticle} />
        </section>
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
}

export default App;
