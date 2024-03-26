import { Box, Button , Text, color, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { executeCode } from './api';

const Output = ({editorRef , language}) => {
    const toast = useToast();
    const [res , setRes] = useState(null);
    const [isLoading , setIsLoading ]= useState(false);
    const [isError , setIsError] = useState(false);

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode) return ;

        try {
            setIsLoading(true);
            const data = await executeCode(language,sourceCode);
            const result = data?.run;
            result.stderr ? setIsError(true) : setIsError(false);
            setRes(result.output)
        }
        catch(error) {
            toast({
                title : "An error occured",
                description : error.message || "Unable to run code",
                status : 'error',
                duration : 6000
            });
        }
        finally {
            setIsLoading(false);
        }
    }
  return (
    <Box w='50%'>
        <Text mb={2} fontSize='lg'>Output</Text>
        <Button variant='outline' colorScheme='green' ml={2} mb={4} onClick={runCode} isLoading={isLoading}>
            Run code
        </Button>

        <Box 
            height='75vh' 
            p={2} 
            border='1px solid' 
            borderRadius={4} 
            borderColor={isError ? 'red.500' : 'gray.500'} 
            color={isError ? 'red.500' : 'gray.500'}>
            {
                res ? res : 'click "Run Code" to see the output'
            }
        </Box>
    </Box>
  )
}

export default Output