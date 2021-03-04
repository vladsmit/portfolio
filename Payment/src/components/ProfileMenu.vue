<template>
    <div class="mainMenu--wrapper">
        <input type="checkbox" id="mobileMenu" />
        <label class="mobileMenu--label" for="mobileMenu"></label>
        <div class="mobileMenu--burgerLine first"></div>
        <div class="mobileMenu--burgerLine second"></div>
        <div class="mobileMenu--burgerLine third"></div>
        <div class="mobileMenu--burgerLine forth"></div>
        <nav class="mainMenu">
            <li class="mainMenu__item mainMenu__item--header">Личный кабинет</li>
            <router-link :to="{ name: 'validateForm'}" class="mainMenu__item--link">
                <li class="mainMenu__item">Платежи</li>
            </router-link>
            <router-link :to="{ name: 'paymentHistory'}" class="mainMenu__item--link">
                <li class="mainMenu__item">История платежей</li>
            </router-link>
            <li class="mainMenu__item mainMenu__item--header">Выйти</li>
        </nav>
    </div>
</template>

<script>
export default {
    name: "ProfileMenu",
};
</script>

<style scoped lang="scss">
.mainMenu--wrapper {
    width: 33%;
}

.mainMenu {
    width: 100%;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

.mainMenu__item {
    width: 100%;
    background-color: rgb(25, 24, 27);
    border-top: 1px solid rgb(105, 103, 103);
    color: #fff;
    font: 600 16px/65px "Arial", sans-serif;
    letter-spacing: 1px;
    padding-left: 25px;
    box-sizing: border-box;
    transition: ease-out 300ms background-color, 300ms color;
    &:nth-child(4) {
        border-bottom: 1px solid rgb(105, 103, 103);
    }
    &:hover {
        background-color: rgb(105, 103, 103);
        color: lightgray;
    }
    &:active {
        background-color: rgb(25, 24, 27);
        color: #fff;
    }
    &--header:hover {
        background-color: rgb(25, 24, 27);
        color: #fff;
    }
}

.mainMenu__item--link {
    text-decoration: none;
}

#mobileMenu {
    display: none;
}

.mobileMenu--label {
    width: 56px;
    display: none;
    position: absolute;
    top: 27px;
    right: 27px;
    padding: 15px 0;
    cursor: pointer;
    z-index: 1;
}

.mobileMenu--burgerLine {
    width: 50px;
    height: 3px;
    display: none;
    position: absolute;
    top: 30px;
    right: 30px;
    background-color: #fff;
    transition: 500ms all;
}

.second,
.third {
    top: 40px;
}

.forth {
    top: 50px;
}

@media only screen and (max-width: 480px) {
    .mainMenu--wrapper {
        width: 100%;
        min-height: 87px;
        position: relative;
        background-color: rgb(41, 46, 58);
    }

    .mainMenu {
        display: block;
        max-height: 0;
        font-size: 0;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 3;
        transform: translateY(100%);
        transition: 500ms all;
    }

    .mainMenu__item {
        text-align: center;
        padding: 0;
    }

    .mobileMenu--label,
    .mobileMenu--burgerLine {
        display: block;
    }

    #mobileMenu:checked ~ .mainMenu {
        max-height: 265px;
        font-size: 16px;
    }

    #mobileMenu:checked ~ .first {
        display: none;
    }

    #mobileMenu:checked ~ .second {
        transform: rotate(45deg);
    }

    #mobileMenu:checked ~ .third {
        transform: rotate(-45deg);
    }

    #mobileMenu:checked ~ .forth {
        display: none;
    }
}
</style>