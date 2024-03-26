import { Box , Text ,Menu , MenuButton ,MenuList, MenuItem , Button } from "@chakra-ui/react";
import { Language_Versions } from "../constants";

const languages = Object.entries(Language_Versions);

const LanguageSelector = ({language , onSelect}) => {
    return (
        <Box ml={2} mb={4}>
            <Text mb={2} fontSize="lg" >Language : </Text>
            <Menu isLazy>
                <MenuButton as={Button}>{language}</MenuButton>
                <MenuList  key={language} bg='#110c1b' >
                    {
                        languages.map(([lang , version]) => (
                            <MenuItem key={lang}  onClick={()=> onSelect(lang) }>{lang} 
                                &nbsp;
                                <Text as="span" color="gray.600" fontSize="sm" >{version}</Text>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}
export default LanguageSelector;