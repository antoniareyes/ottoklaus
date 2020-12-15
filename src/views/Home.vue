<template>
<v-app>
  <v-img src="https://media.istockphoto.com/vectors/children-toy-set-kids-drawing-vector-flat-style-cartoon-illustration-vector-id1227375713">
  
  <v-card width="400px"  class="my-auto mx-auto" color="green lighten-4">
   <v-card-title v-text="emptyToy.id ? 'Editar': 'Crear'" ></v-card-title>
    <v-card-text>
    <v-form
    ref="form">
  
    <v-text-field
      label="Nombre"
      required
      type="type" class="form-control" id="toyName" v-model='emptyToy.name'
    ></v-text-field>

    <v-text-field
      type="text" class="form-control" id="toyCode" v-model='emptyToy.code'
      label="Código"
      required
    ></v-text-field>

    <v-text-field
      type="number" class="form-control" id="toyPrice" v-model='emptyToy.price'
      label="Precio"
      required
    ></v-text-field>

    <v-text-field
      type="number" class="form-control" id="toyStock" v-model='emptyToy.stock'
      label="Stock"
      required
    ></v-text-field>

    <v-card-actions>
    <v-btn
      color="success"
      class="mr-4"
       @click.prevent="submitToy" v-text="emptyToy.id ? 'Editar': 'Crear'"
    >
      
    </v-btn>

    <v-btn
      color="warning"
      @click="resetToy"
    >
      Resetear formulario
    </v-btn>
    </v-card-actions>
  </v-form>
    </v-card-text>
  </v-card>
  <v-container>
    <v-simple-table  color="green lighten-4">
      <thead>
        <th class="text-left">Código</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Stock</th>
        <th class="text-left">Precio</th>
        <th class="text-left"></th>
        <th class="text-left"></th>
      </thead>
      <tbody>
        <tr v-for="toy in toys" :key="toy.id"> 
          <td>{{toy.data.code}}</td>
          <td>{{toy.data.name}}</td>
          <td>{{toy.data.stock}}</td>
          <td>${{toy.data.price}}</td>
          <td><v-btn
        outlined
        rounded
        text
        @click.prevent="deleteT(toy.id)"
        color="error"
      >
        Borrar
      </v-btn></td>
          <td><v-btn
        outlined
        rounded
        text
        @click.prevent="editToy(toy)"
        color="warning"
      >
        Editar
      </v-btn></td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
  
  </v-img>
</v-app>
</template>

<script>
// @ is an alias to /src

import { mapState, mapActions } from "vuex";
export default {
  data(){
    return{
      emptyToy:{
       id: null,
          code: null,
          name: null,
          stock: 0,
          price: 0

      }
    }
  },
  name: "Home",
  computed: {
    ...mapState(["toys"]),
  },
  methods: {
    ...mapActions(["getToys", "postToy", "deleteToy", "updateToy","getToy"]),
    searchToy(toyName){
       this.getToy(toyName)
    },
    submitToy(){
      if(this.emptyToy.code != "" && this.emptyToy.price != "" && this.emptyToy.stock != "" && this.emptyToy.name != ""){
      if(this.emptyToy.id){
        if(confirm('Estás seguro de que quieres editar este juguete')){
        this.updateToy(this.emptyToy)
        }
      }else{
        if(confirm('Estás seguro de que quieres agregar este juguete')){
        this.postToy(this.emptyToy);
        }
      }
      this.resetToy()
      }
    },
    deleteT(toyId){
      if(confirm('Estás seguro de que quieres eliminar este juguete')){
      this.deleteToy(toyId);
      }
    },
    editToy(toy){
      this.emptyToy.name= toy.data.name
      this.emptyToy.code= toy.data.code
      this.emptyToy.stock= toy.data.stock
      this.emptyToy.price= toy.data.price
      this.emptyToy.id= toy.id
    },
    resetToy(){
      this.emptyToy.name= null
      this.emptyToy.code= null
      this.emptyToy.stock= 0
      this.emptyToy.price= 0
      this.emptyToy.id= null
  },
  },
  created() {
    this.getToys();
  }
};
</script>
