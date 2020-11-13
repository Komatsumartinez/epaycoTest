import styled from 'styled-components';

const StyledRegistro = styled.div`

h1{
  margin: 3em 16em 0em 18em;
  color: black;
  
}

  .card-form{
    display: flex;
    margin: 2em auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    width: 25em;

    form {
      display: flex;
      flex-direction: column;
      padding: 3em 2em 1em 2em;
      width: 100%;
    }

    input{
      background: #f2f2f2;
      padding: 1em;
      border: none;
      width: 25em;
      
    }


    button {
        margin: 1em auto 1em auto ;
        background-color: rgb(245,138,62  );
        border: none;
        color: black;
        padding: 7px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    button:hover{
      background-color:rgb(251,164,74);
    }

    
  }


`
export default StyledRegistro