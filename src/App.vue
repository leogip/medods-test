<template>
    <div class="main">
        <h1>Simon the Game</h1>
        <h2>Round: {{ round }}</h2>
        <LevelInput />
        <Board @button-handler="buttonHandler" />
        <button class="button" @click="startGame">Start/Restart</button>
    </div>
</template>

<script>
import Board from '@/components/Board';
import LevelInput from '@/components/LevelInput';
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
    name: 'App',
    components: { Board, LevelInput },
    computed: {
        ...mapGetters([
            'currentSequence',
            'buttonsLocked',
            'highlightedItem',
            'timeOutLength',
            'sequenceLength',
            'round',
            'wholeSequence',
        ]),
    },

    methods: {
        ...mapMutations([
            'addRound',
            'createSequence',
            'clearGameState',
            'lockButtons',
            'notifyError',
            'setActiveBlock',
            'setCurrentSequence',
            'highlightItem',
            'shadeItem',
        ]),
        ...mapActions(['onGameComplete', 'onUserError']),

        buttonHandler(userColor) {
            if (this.currentSequence.length > 0 && !this.buttonsLocked) {
                this.lockButtons(true);
                let color = this.currentSequence.shift();
                this.highlightItem(userColor);
                this.blinkColor();
                if (color !== userColor) {
                    this.onUserError();
                } else if (this.currentSequence.length === 0) {
                    if (this.round === this.sequenceLength) {
                        this.onGameComplete();
                    } else {
                        this.onSequenceComplete();
                    }
                } else {
                    this.lockButtons(false);
                }
            }
        },

        onSequenceComplete() {
            this.addRound();
            this.setCurrentSequence(this.nextSequence());
            setTimeout(this.playSequence, 3000, this.nextSequence());
        },
        playSequence(sequence) {
            if (sequence.length > 0) {
                this.highlightItem(sequence.shift());
                this.blinkColor();
                window.setTimeout(
                    this.playSequence,
                    this.timeOutLength,
                    sequence
                );
            } else this.lockButtons(false);
        },
        nextSequence() {
            return this.wholeSequence.slice(0, this.round);
        },

        blinkColor() {
            this.highlightColor();
            window.setTimeout(this.shadeItem, this.timeOutLength);
        },
        highlightColor() {
            var audio = null;
            this.setActiveBlock(this.highlightedItem);
            switch (this.highlightedItem) {
                case 'green':
                    audio = new Audio(
                        'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
                    );
                    break;
                case 'red':
                    audio = new Audio(
                        'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'
                    );
                    break;
                case 'yellow':
                    audio = new Audio(
                        'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
                    );
                    break;
                case 'blue':
                    audio = new Audio(
                        'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
                    );
                    break;
            }
            if (audio !== null) audio.play();
        },

        startGame() {
            this.clearGameState();
            this.createSequence();
            this.setCurrentSequence(this.wholeSequence.slice(0, 1));
            this.playSequence(this.wholeSequence.slice(0, 1));
        },
    },
};
</script>

<style>
.main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}
.button {
    border: none;
    background-color: dodgerblue;
    padding: 15px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border-radius: 5px;
    transition: background 0.3s;
}

.button:hover {
    cursor: pointer;
    background-color: deepskyblue;
}
</style>
