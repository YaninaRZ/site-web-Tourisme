import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { ContentProvider } from './data/store'
import { Admin } from './pages/admin/Admin'
import { AppPage } from './pages/AppPage'
import { ArticlePage, Blog } from './pages/Blog'
import { CategoryPage } from './pages/CategoryPage'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Confidentialite, MentionsLegales } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { PlacePage } from './pages/PlacePage'
import { Search } from './pages/Search'
import { Videos } from './pages/Videos'
import './App.css'

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories/:slug" element={<CategoryPage />} />
            <Route path="lieux/:id" element={<PlacePage />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
            <Route path="videos" element={<Videos />} />
            <Route path="recherche" element={<Search />} />
            <Route path="application" element={<AppPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="confidentialite" element={<Confidentialite />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/:section" element={<Admin />} />
            <Route path="admin/:section/:id" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  )
}

export default App
