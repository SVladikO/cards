import {Wrapper, ThinkWrapper, Emoji, Owner} from './player.style';

import {ReactComponent as LoadIcon} from '../../img/load.svg';

const thinkEmojies = ['🤔', '🧐'];

function getThinkEmoji() {
    const index = Math.floor(Math.random() * thinkEmojies.length);
    return thinkEmojies[index];
}

export default function Player({isWalk, owner}) {
    return (
        <Wrapper className="player-wrapper">
            <Emoji>{isWalk ? getThinkEmoji() : '🙂' }</Emoji>
            {isWalk &&
                <ThinkWrapper className="think-wrapper">
                    <LoadIcon/>
                </ThinkWrapper>
            }
            <Owner>{owner}</Owner>
        </Wrapper>
    )
}

//🤭 🙂 🥳 🤓 🥰 коли знімаю я
//коли я підкидаю
//🤨🤔🧐 першу карту
//🤕 😬 другу карту
//😳 🫣 третю карту
//😮 четверту карту
//😱 пяту карту
//🤯 шосту карту
//коли чекає мій хід
//🙂 🥱 😴коли довго думаю
