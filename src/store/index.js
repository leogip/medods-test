import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeBlock: '',
        currentSequence: [],
        buttonsLocked: false,
        highlightedItem: ' ',
        level: 'easy',
        sequenceLength: 30,
        timeOutLength: 1500,
        round: 1,
        wholeSequence: [],
    },
    mutations: {
        changeLevel(state, payload) {
            state.level = payload;
            switch (payload) {
                case 'easy':
                    state.timeOutLength = 1500;
                    break;
                case 'normal':
                    state.timeOutLength = 1000;
                    break;
                case 'hard':
                    state.timeOutLength = 400;
                    break;
            }
        },
        clearGameState(state) {
            state.wholeSequence = [];
            state.round = 1;
        },
        createSequence(state) {
            let colorNumber = null,
                lastColor = null;
            for (let i = 0; i < state.sequenceLength; i++) {
                do {
                    colorNumber = Math.round(Math.random() * 4);
                } while (colorNumber === lastColor);
                if (colorNumber === 0) state.wholeSequence.push('green');
                else if (colorNumber === 1) state.wholeSequence.push('red');
                else if (colorNumber === 2) state.wholeSequence.push('yellow');
                else if (colorNumber === 3) state.wholeSequence.push('blue');
                lastColor = colorNumber;
            }
        },


        setCurrentSequence(state, payload) {
            state.currentSequence = payload;
        },

        lockButtons(state, payload) {
            state.buttonsLocked = payload;
        },

        addRound(state) {
            state.round++;
        },

        setActiveBlock(state, payload) {
            state.activeBlock = payload;
        },
        highlightItem(state, payload) {
            state.highlightedItem = payload;
        },
        shadeItem(state) {
            state.activeBlock = '';
        },

        notifyError(state) {
            state.round = 'your lose';
        },
    },
    actions: {
        onGameComplete({ state }) {
            state.round = 'You win!';
        },

        onUserError({ commit, state }) {
            commit('notifyError');
        },
    },
    getters: {
        activeBlock: (state) => state.activeBlock,
        currentSequence: (state) => state.currentSequence,
        buttonsLocked: (state) => state.buttonsLocked,
        highlightedItem: (state) => state.highlightedItem,
        timeOutLength: (state) => state.timeOutLength,
        sequenceLength: (state) => state.sequenceLength,
        round: (state) => state.round,
        wholeSequence: (state) => state.wholeSequence,
    },
});
