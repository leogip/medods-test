<template>
    <div class="board">
        <div
            v-for="color in colors"
            :key="color"
            :class="['square', color, { active: activeBlock === color }]"
            @click="$emit('button-handler', color)"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            colors: ["green", "red", "yellow", "blue"]
        }
    },
    computed: {
        ...mapGetters(['activeBlock']),
    },
};
</script>

<style scoped>
.board {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 25px;
}

.square {
    width: 250px;
    height: 250px;
    opacity: 0.2;
    cursor: pointer;
}

.square:hover {
    box-shadow: 0 0 4px 0 black;
    transition: all 0.3 ease-in-out;
}

.square.active {
    opacity: 1;
}
.green {
    background-color: green;
    border-radius: 100% 0 0 0;
}
.red {
    background-color: red;
    border-radius: 0 100% 0 0;
}
.yellow {
    background-color: yellow;
    border-radius: 0 0 0 100%;
}
.blue {
    background-color: blue;
    border-radius: 0 0 100% 0;
}

</style>
