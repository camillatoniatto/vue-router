<template>
    <div>
        <h3 class="font-weight-light">Detalhes do contato- id {{$route.params.id}}</h3>
        <router-link class="btn btn-primary" :to="`/contatos/${id}/editar`">Editar</router-link>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    created() {
        console.log('Parametros da rota: ', this.$props)
    }
}
</script>