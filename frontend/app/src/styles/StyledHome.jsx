import styled from 'styled-components'


const StyledHome = styled.div`

.content{
    margin-top: 10em;
}
  
li{
    list-style: none;
}

.cardbox{
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    transition: 0.3s;
    margin: 5em 10em;
    position: relative;
    height: 10em;
    display: flex;


    a{
        padding: 2em;
        text-decoration: none;
        color: black;
        width: 100%;
        font-size: 30px;
    }

    .data {
        padding: 2em;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;

        button{
            border: none;
            color: black;
            padding: 7px 25px;
            text-decoration: none;
            font-size: 16px;
            margin-left: 1em;
        }
    }

    svg{
        position: absolute;
        right: 20%;
        width: 4em;
        height: 4em;
        color: darkgray;
        margin-top: 3em
    }
}

.cardbox:hover{
    box-shadow: 0 20px 30px rgba(0,0,0,0.19), 0 10px 10px rgba(0,0,0,0.23);
    background: #f2f2f2;
}
`

export default StyledHome