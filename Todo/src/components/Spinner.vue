<template>
    <div class="text-center align-item">
        <b-spinner variant="success" label="Spinning"></b-spinner>
    </div>
</template>
<script>
export default {
    name: "Spinner",
};
</script>
<style lang="scss" scoped>
.align-item {
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>