<template>
  <form class="inzerat" method="POST" action="">
    <h1>Detail inzerátu</h1>
        
            
                <h2>Vyberte foto </h2>
                <button>Vybrat soubor</button>
           
                <h2> Vyberte typ</h2>
                <input type="radio" name="typInzeratu" value="nabizim" v-model="typ">Nabízím
                <input type="radio" name="typInzeratu" value="poptavam" v-model="typ">Poptávám
           
                <h2> Vyberte Kategorii</h2>
                <select v-model="kategorie">
                    <option value="kvetiny">Květiny</option>
                    <option value="hracky">Hračky</option>
                    <option value="obleceni">Oblečení</option>
                    <option value="domacnost">Domácnost</option>
                    <option value="jine">Jiné</option>
                </select>
          
                <h2> Název produktu</h2>
                <input type="text" v-model="nazev">
          
                <h2> Popis </h2>
                <textarea v-model="popis"></textarea>
           
                <h2> Ulice</h2>
                <input type="text" v-model="ulice">
            
                <h2> Město</h2>
                <input type="text" v-model="mesto">
            
                <h2> PSČ</h2>
                <input type="text" v-model="psc">
            
                <h2> Vyměním za..</h2>
                <textarea v-model="vymenim"></textarea>

                <button>Přidat inzerát</button>
            
  </form>
</template>

<script>
export default{
   data(){
       return{
        typ:"nabizim",
        kategorie:"domacnost",
        nazev:"Dřevěná skříň...",
        popis:"Zde popište zboží",  
        ulice:"",
        mesto:"",
        psc:"",
        vymenim:"Zde napište za co, chcete zboží vyměnit",

        
       };
   },
       
    

}

  
</script>

<style>

</style>