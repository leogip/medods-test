<template>
    <div class="level">
        Level:
        <select @change="changeLevelHandler">
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
        </select>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'LevelInput',
    methods: {
        ...mapMutations(['changeLevel']),
        changeLevelHandler(e) {
            this.changeLevel(e.target.value);
        },
    },
};
</script>

<style>
.level {
    margin-bottom: 25px;
}
</style>
