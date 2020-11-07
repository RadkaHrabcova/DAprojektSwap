<template>
  <form @submit.prevent="sendData" class="inzerat" method="POST" action="http://127.0.0.1:5000/ad">
    <h1>Detail inzerátu</h1>
        
            
                <h2>Vyberte foto </h2>
                <button>Vybrat soubor</button>
           
                <h2> Vyberte typ</h2>
                <input type="radio" name="typeOfAd" value="offer" v-model="type">Nabízím
                <input type="radio" name="typeOfAd" value="request" v-model="type">Poptávám
           
                <h2> Vyberte Kategorii</h2>
                <select v-model="category">
                    <option value="flowers">Květiny</option>
                    <option value="toys">Hračky</option>
                    <option value="clothes">Oblečení</option>
                    <option value="household">Domácnost</option>
                    <option value="others">Jiné</option>
                </select>
          
                <h2> Název produktu</h2>
                <input type="text" v-model="name">
          
                <h2> Popis </h2>
                <textarea v-model="description"></textarea>
           
                <h2> Ulice</h2>
                <input type="text" v-model="street">
            
                <h2> Město</h2>
                <input type="text" v-model="city">
            
                <h2> PSČ</h2>
                <input type="text" v-model="zipCode">
            
                <h2> Vyměním za..</h2>
                <textarea v-model="exchange"></textarea>

                <button>Přidat inzerát</button>
            
  </form>
</template>

<script>
export default{
   data(){
       return{
        type:"nabizim",
        category:"domacnost",
        name:"Dřevěná skříň...",
        description:"Zde popište zboží",  
        street:"",
        city:"",
        zipCode:"",
        exchange:"Zde napište za co, chcete zboží vyměnit",

        
       };
   },
   methods:{
     sendData(){
       fetch("http://127.0.0.1:5000/ad",{
         method:"POST",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({
           type:this.type,
           category:this.category,
           name:this.name,
           description:this.description,
           street:this.street,
           city:this.city,
           zipCode:this.zipCode,
           exchange:this.exchange
         })
       })
     }
   }

       
    

}

  
</script>

<style>

</style>