//here run import statment using ES6, install babel to help us with that

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

import { performAction } from './js/app.js'

//document.getElementById('search').addEventListener('click', performAction);
document.addEventListener('DOMContentLoaded' , () => {
    document.getElementById('search').click = performAction
    });

export { performAction }