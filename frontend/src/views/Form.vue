<template>
  <div>
    <h1>Formulář</h1>
        <ul>
            <li>
                <p> Jméno</p>
                <input type="text" v-model="jmeno" >
            </li>
            <li>
                <p> Příjmení</p>
                <input type="text" v-model="prijmeni">
            </li>
            <li>
                <p> Název zboží</p>
                <input type="text" v-model="zbozi">
            </li>
            <li>
                <p> Kategorie</p>
                <select v-model="kategorie">
                    <option value="kvetiny">kvetiny</option>
                    <option value="hracky">hracky</option>
                    <option value="obleceni">obleceni</option>
                    <option value="domacnost">domacnost</option>
                    <option value="jine">jine</option>
                <select/>
            </li>
        </ul>
  </div>
</template>

<script>


  
</script>

<style>
</style>