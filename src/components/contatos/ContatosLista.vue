<template>
    <div>
        <h3 class="font-weight-light">Contatos</h3>

        <div class="form-group">
            <input type="search" class="form-control" placeholder="Buscar contatos" @keyup.enter="buscar" :value="busca">
        </div>

        <ul class="list-group" v-if="contatosFiltro.length > 0">
            <ContatosListaItem
                class="list-group-item"
                v-for="contato in contatosFiltro"
                :key="contato.id"
                :contato="contato"/>
        </ul>

        <ul v-else>Nenhum contato cadastrado</ul>
        <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
    </div>
</template>

<script>
import ContatosListaItem from './ContatosListaItem.vue'
export default {
    props: ['busca'],
    components: {
        ContatosListaItem
    },
    data() {
        return {
            contatos: [
                { id: 1, nome: 'Cleiton O Gatuno', email: 'cleitin@mail.com' },
                { id: 2, nome: 'Jorge O Paladinho', email: 'jorgim@mail.com' },
                { id: 3, nome: 'Gertrudes A Druida', email: 'gezinha@mail.com' }
            ]
        }
    },
    computed: {
        contatosFiltro() {
            const busca = this.busca
            return !busca ? this.contatos : this.contatos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
        }
    },
    methods: {
        voltar() {
            this.$router.back()
        },
        buscar(event) {
            this.$router.push({
                path: '/contatos',
                query: { buscar: event.target.value }
            })
        }
    }
}
</script>