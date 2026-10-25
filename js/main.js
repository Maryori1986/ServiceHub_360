import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
const page = document.body.dataset.page || 'inicio';
renderHeader(page);
renderFooter();
