import styled from 'styled-components'

const StyledHeader = styled.nav`

box-shadow: 0 4px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23);
height: 4em;
background: #f2f2f2;
display: flex;
position: fixed;
top: 0;
width: 100%;
z-index: 10;



span, ul{
    padding: 1em;
    color: black;
    margin: 0;
}
a{
        text-decoration: none;
        color: black;
    }


ul{
    cursor: pointer;
    display: flex;
    list-style: none;
    flex-direction: row;
    margin: 0;
    padding: 0;

    li {
        display: block;
        justify-content: center;
        margin: 0;
        padding: 1em 2em;
        height: 100%;
    }


    li:hover{
        background: rgb(245, 138, 62);
        color: #fff;
    }

}
`
export default StyledHeader