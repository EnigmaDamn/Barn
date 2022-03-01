import * as React from 'react';
import { ImageBackground} from "react-native";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Paper, FormControl, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

function Input() {
    const [data, setData] = useState(null)
    const [titdata,setTit] = useState(null)
    const [lindata,setLing] = useState(null) 
    function getData(val)
    {
        setData(val.target.value)
        
    }
    function getTit(val){
      setTit(val.target.value)
    }
    function getLine(val){
      setLing(val.target.value)
    }
    const [posts,setPosts] = useState([])  //stores the  data to display

    function flines()
    {
      let lig = 'https://poetrydb.org/lines/' + lindata
      axios.get(lig)
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      }).catch(err => console.log(err))
    }


    function callWeb()
    {
      console.log(data + '/' + titdata)
      // const nig = 'https://poetrydb.org/author/' + data
      let nig = 'https://poetrydb.org/'
      let backData = '/'
      let datch = 0
      if(data!=null)
      {
        datch = 1
        nig = nig + 'author'
        backData = backData + data
      } //when only author
      if(datch == 0 && titdata!=null)
      {
        nig = nig + 'title'
        backData = backData + titdata
      }else if (datch == 1 && titdata!=null){
        nig = nig + ',title'
        backData = backData + ';' + titdata
      }
      
      nig = nig + backData
      console.log(nig)
      axios.get(nig)
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      }).catch(err => console.log(err))
    }
    function russia(ukraine,stit){
      return (
        <div className='lawdi'>  
        <h3>{stit}</h3>
        <br/>
        { ukraine.map((tem) => 
            (<p key={tem}> {tem} </p>))
          }
          <br/>
        </div>
      )
    }
//<CssTextField sx = {{ paddingBottom: '10px' }} onChange={getData} label="Author" id="custom-css-outlined-input" />
  return (
        <div >        
        <Box display={"flex"} sx={{ bgcolor: '#404040', height: '80vh' , mx: 20 }} >

            <FormControl sx={{padding: '20px 40px' }}>
               <TextField sx = {{ paddingBottom: '10px' }} onChange={getData} color ="primary" id="outlined-basic" label="Author" variant="outlined" />
                <TextField sx = {{ paddingBottom: '10px' }} onChange={getTit} id="outlined-basic" label="Title" color="primary" variant="outlined" />
                <Button onClick={callWeb} variant="contained">Find</Button>
                {/* <Stack >
                        <Item>{data}</Item>
                </Stack> */}
                <br/>
                <TextField sx = {{ paddingBottom: '10px' }} onChange={getLine} id="outlined-basic" label="Line" variant="outlined" />
                <Button onClick={flines} variant="contained">Find by Line</Button>
            </FormControl>

            <Box className='scrol-div'  textAlign={"center"}
            sx={{width: 900 }}  >
                <div className='lawdi'>
                    {posts.map((item)=> {
                      const shite = item.lines
                      console.log(typeof shite);
                      
                      const tits = item.title
                        /* return <p key={item.id}>{item.lines}</p> */
                      return russia(shite,tits)
                      
                    })} 
                </div>
            </Box>
        </Box>
        </div>
  );
}
export default Input;