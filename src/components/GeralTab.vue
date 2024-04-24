<script setup>
import { computed } from 'vue';
import logo from '../../assets/images/Logo.png';
import stores from '../../stores';

const changeTheme = (e) => {
    e.preventDefault();
    stores.commit('setThemeColor', {
        theme: e.target.value
    });
    localStorage.setItem('theme', e.target.value);
};

const theme = computed(() => stores.getters.themeBase2);
const textColor = computed(() => stores.getters.textColor);
const primaryColor = computed(() => stores.getters.primaryColor);
const secondaryColor = computed(() => stores.getters.secundaryColor);
const themeColor = computed(() => stores.getters.themeColor);
</script>

<template>
    <form class="visualSelector">
        <div class="themeWrapper">
            <span class="textStyle">Cor primaria da empresa</span>
            <div class="themesSelector">
                <div class="logoImgWrapper">
                    <img :src="logo" />
                    <span class="textStyle">Editar logo da empresa</span>
                </div>

                <div class="buttonWrapper">
                    <div class="textWrapper">
                        <span class="textStyle"
                            >Cor Secundaria <br />da Empresa</span
                        >
                    </div>
                    <button class="textStyle">Clique para selecionar</button>
                </div>

                <div class="buttonWrapper">
                    <div class="textWrapper">
                        <span class="textStyle"
                            >Cor Principal <br />do texto
                        </span>
                    </div>
                    <button class="textStyle">Clique para selecionar</button>
                </div>
            </div>
            <div class="themesSelector">
                <button
                    @click="changeTheme"
                    value="white"
                    class="themeBox"
                    :style="{ backgroundColor: '#D9D9D9', color: 'black' }"
                >
                    Tema Claro
                </button>
                <button
                    @click="changeTheme"
                    value="twilight"
                    class="themeBox"
                    :style="{ backgroundColor: '#626262' }"
                >
                    Tema Crepusculo
                </button>
                <button
                    @click="changeTheme"
                    value="dark"
                    class="themeBox"
                    :style="{ backgroundColor: '#1E1E1E' }"
                >
                    Tema Escuro
                </button>
            </div>

            <div class="inputWrapper" :style="{ maxWidth: '50%' }">
                <label for="companyName" class="textStyle"
                    >Nome da empresa:</label
                >
                <input name="companyName" class="companyName" type="text" />
            </div>

            <div class="inputWrapper">
                <span class="textStyle">Apelidos</span>
                <div class="checkBoxWrapper" style="flex-direction: row">
                    <input name="apelidos" id="apelidos" type="checkbox" />
                    <label for="apelidos" class="textStyle"
                        >Habilitar apelidos para toda organização</label
                    >
                </div>
            </div>

            <div class="inputWrapper">
                <span class="textStyle">Fotos</span>
                <div class="checkBoxWrapper" style="flex-direction: row">
                    <input name="fotos" id="fotos" type="checkbox" />
                    <label for="fotos" class="textStyle"
                        >Solicitar aos colaboradores terem uma foto de perfil,
                        se não tiverem</label
                    >
                </div>
            </div>

            <div class="inputWrapper">
                <div class="checkBoxWrapper" style="flex-direction: row">
                    <input name="idioma" checked id="portugues" type="radio" />
                    <label for="portugues" class="textStyle">Portugues</label>
                </div>
            </div>

            <div class="inputWrapper">
                <label for="mural" class="textStyle"
                    ><span :style="{ fontSize: '20px' }">Mural</span> <br />
                    <span :style="{ fontWeight: 500 }"> Mensagem inicial </span>
                    <br />
                    <span :style="{ fontWeight: 500, color: '#626262' }">
                        Essa mensagem será exibida na página inicial da empresa.
                    </span>
                </label>
                <input
                    class="companyName"
                    style="height: 150px; justify-content:"
                    type="text"
                    id="mural"
                />
            </div>
        </div>
    </form>
</template>

<style scoped>
.visualSelector {
    flex: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    gap: 50px;
}

.logoImgWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 2px solid v-bind(primaryColor);
    min-width: 200px;
    background-color: v-bind(secondaryColor);
    border-radius: 12px;
    span {
        font-size: 16px;
        font-weight: 600;
    }
}

.themeWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.checkBoxWrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    input {
        display: grid;
        place-content: center;
        appearance: none;
        border: 2px solid v-bind(primaryColor);
        padding: 2px;
        border-radius: 50%;
        align-items: center;
    }
    input::before {
        content: '';
        width: 10px;
        height: 10px;
        padding: 2px;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em v-bind(primaryColor);
    }
    input:checked::before {
        transform: scale(1);
    }
    input:checked {
        border-color: v-bind(primaryColor);
    }
}

.themesSelector {
    display: flex;
    flex: 1;
    gap: 10px;
    justify-content: space-between;
}

.themeBox {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    height: 96px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 12px;
}

.buttonWrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 21px;
    border-radius: 12px;

    button {
        background-color: white;
        border: 2px solid v-bind(primaryColor);
        padding: 10px;
        color: black;
        font-size: 16px;
        font-weight: 700;
        border-radius: 16px;
    }
}
.textWrapper {
    display: flex;
    flex: 1;
    min-width: 200px;
    padding: 10px 15px;
    border-radius: 12px;
    border: 2px solid v-bind(primaryColor);
    background-color: v-bind(secondaryColor);
}

.companyName {
    flex-grow: 1;
    border: none;
    outline: none;
    border-radius: 16px;
    width: 100%;
    color: v-bind(textColor);
    padding: 6px;
    transition: outline 150ms ease-in-out;
    background-color: v-bind(theme);
}

.companyName:focus {
    flex-grow: 1;
    outline: 3px solid v-bind(primaryColor);
}

.inputWrapper {
    flex-grow: 1;
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.textStyle {
    font-size: 16px;
    font-weight: 700;
    color: v-bind(textColor);
}
</style>
