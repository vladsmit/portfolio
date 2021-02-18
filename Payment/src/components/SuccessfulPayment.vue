<template>
    <div class="success--wrapper">
        <img src="@/assets/success.png" alt="success" class="success__image" />
        <h3 class="success__title success__title--margin">оплата прошла успешно</h3>
        <div class="success__info--wrapper">
            <p class="success__info">Информация по платежу:</p>
            <ul class="success__list">
                <li class="success__list--item">Номер операции:</li>
                <li class="success__list--item">Номер счета:</li>
                <li class="success__list--item">Cумма:</li>
                <li class="success__list--item">Номер карты:</li>
                <li class="success__list--item">Держатель карты:</li>
                <li class="success__list--item">Дата транзакции:</li>
            </ul>
            <ul class="success__list">
                <li class="success__list--item">
                    {{ this.$store.state.accounts[this.$store.state.accounts.length - 1].id }}
                </li>
                <li class="success__list--item">
                    {{ this.$store.state.accounts[this.$store.state.accounts.length - 1].accountNumber }}
                </li>
                <li class="success__list--item">
                    {{ this.$store.state.accounts[this.$store.state.accounts.length - 1].sum }} руб.
                </li>
                <li class="success__list--item">
                    **** **** ****
                    {{ this.$store.state.accounts[this.$store.state.accounts.length - 1].cardNumber }}
                </li>
                <li class="success__list--item">
                    {{ this.$store.state.accounts[this.$store.state.accounts.length - 1].owner }}
                </li>
                <li class="success__list--item">
                    {{ this.$store.state.accounts[this.$store.state.accounts.length - 1].date }}
                </li>
            </ul>
        </div>
        <router-link to="/payments" class="button--link button--margin">
            <input type="button" value="Вернуться в кабинет" class="button" />
        </router-link>
    </div>
</template>

<script>
export default {
    name: "SuccessfulPayment",
    beforeRouteLeave(to, from, next) {
        this.$store.commit("changeValidationPassed");
        next();
    },
};
</script>

<style scoped lang="scss">
.success--wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 40px 0;
    box-sizing: border-box;
}

.success__image {
    width: 100px;
}

.success__title {
    font: 600 20px "Arial", sans-serif;
    text-transform: uppercase;
    &--margin {
        margin: 15px 0 19px;
    }
}

.success__info--wrapper {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.success__info {
    width: 100%;
    font: 600 14px "Arial", sans-serif;
    margin-top: 0;
}

.success__list {
    padding: 0;
    margin-top: 0;
}

.success__list--item {
    font: 400 14px/25px "Arial", sans-serif;
    list-style-type: none;
}

.button {
    border: none;
    border-radius: 30px;
    background-color: rgba(7, 87, 179, 0.836);
    box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
    color: #fff;
    font: 400 14px "Arial", sans-serif;
    padding: 10px 26px;
    box-sizing: border-box;
    cursor: pointer;
    transition: ease-out 300ms background-color;
    &:hover {
        background-color: rgba(37, 110, 158, 0.836);
    }
    &:active {
        background-color: rgba(7, 87, 179, 0.836);
    }
    &--link {
        text-decoration: none;
    }
}

@media only screen and (max-width: 480px) {
    .success__title--margin {
        margin: 20px 0 20px;
    }

    .button--margin {
        margin-top: 5px;
    }
}
</style>