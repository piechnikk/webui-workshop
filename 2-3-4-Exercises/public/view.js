import aboutPage from './pages/about/aboutPage.js';
import homePage from './pages/home/homePage.js';
import { h, switchCase } from '/js/src/index.js';

/**
 * Main view layout
 * @return {vnode} application view to be drawn according to model
 */
export default (model) => [
  h('.flex-column.absolute-fill', [
    header(model),
    content(model)
  ])
];

/**
 * Top header of the page
 * @param {Model} model
 * @return {vnode}
 */
const header = (model) =>{
  const { router } = model;
  const {params: {page}} = router;
  return h('.p2.shadow-level2.level2', {
    style: 'display: flex; justify-content: center'
  }, `Welcome to your ${page} page`);
}

/**
 * Page content
 * @return {vnode}
 */
const content = (model) => {
  const { router: { params: { page } } } = model;
  return switchCase(page, {
    home: homePage,
    about: aboutPage
  })(model);
};
