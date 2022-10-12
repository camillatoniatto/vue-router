import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Contatos from './views/contatos/Contatos.vue'
import ContatosHome from './views/contatos/ContatosHome.vue'
import ContatosDetalhes from './views/contatos/ContatosDetalhes.vue'
import ContatosEditar from './views/contatos/ContatosEditar.vue'
import Erro404Contatos from './views/contatos/Error404Contatos.vue'
import Erro404 from './views/Error404.vue'

Vue.use(VueRouter)

const extraitParametroId = route => ({id: +route.params.id})

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/contatos',
            alias: '/meus-contatos',
            props: (route) => {
                const busca = route.query.buscar
                return busca ? { busca } : {}
            },
            component: Contatos,
            children: [
                { path: ':id(\\d+)', component: ContatosDetalhes, name: 'contato', props: extraitParametroId}, //meus-contatos.com/contatos/2
                { path: ':id(\\d+)/editar', components: { default: ContatosEditar, 'contato-detalhes': ContatosDetalhes }, props: {default: extraitParametroId, 'contato-detalhes': extraitParametroId}, beforeEnter(to, from, next) {if(to.query.autenticado === 'true'){return next()} next('/')}}, //meus-contatos.com/contatos/2/editar
                //{ path: ':id(\\d+)/editar/:zeroOuMais*', components: { default: ContatosEditar, 'contato-detalhes': ContatosDetalhes }, props: {default: extraitParametroId, 'contato-detalhes': extraitParametroId}}, //meus-contatos.com/contatos/2/editar
                //{ path: ':id(\\d+)/editar/:umOuMais+', components: { default: ContatosEditar, 'contato-detalhes': ContatosDetalhes }, props: {default: extraitParametroId, 'contato-detalhes': extraitParametroId}}, //meus-contatos.com/contatos/2/editar
                { path: '', component: ContatosHome},
                { path: '*', component: Erro404Contatos } // 404 not found
            ]
        }, //meus-contatos.com/contatos
        { path: '/', component: Home }, //meus-contatos.com
        //{ path: '/', redirect: {name: 'contato'} }
        //{ path: '/:id', component: ContatosDetalhes }, //meus-contatos.com/contatos/2
        //{ path: '*', redirect: '/contatos' }, // 404 not found, há rediecionamento
        { path: '*', component: Erro404 }, // 404 not found contatos
    ]
})

/*router.beforeEach((to, from, next) => {
    console.log('beforeEach')
    next()
})

router.afterEach((to, from) => {
    console.log('afterEach')
})*/

export default router