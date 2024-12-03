import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";



interface IMenuLateralProps {
    children: React.ReactNode;
}

interface IListItemLinkProps {
    to: string;    //caminho para rota de navegação 
    icon: string;  //item para o exibição menu
    label: string; //texto a ser exibido no menu 
    onClick: (() => void) | undefined;   //funçao ao ser chamada ao clicar 
}

//componente para cada item do menu 
const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();  //hook para navegação de rota 

    const resolvedPath = useResolvedPath(to);  //resolvedpath cria um objeto com o camimnho absoluto da rota 
    const match = useMatch({ path: resolvedPath.pathname, end: false }); //usematch verifica o caminho atual da rota 
    const [isSelected, setIsSelected] = useState(!!match);  //controla se o item esta selecionado 

    //atualiza sempre que o estado atual da rota muda 
    useEffect(() => {
        if (match) {
            setIsSelected(true);
        }
    }, [match])

    //função chamada ao clicak em algum item do menu 
    const handleClick = () => {
        setIsSelected(true);  //marca o item selecionado 
        navigate(to);         //define o camimho da rota 
        onClick?.();          //chama a função onclick passada como props 
    }

    return (
        //renderiza  o botao com base no estilo selecionado baseado no estado 
        <ListItemButton selected={isSelected} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

//componente principal do menu lateral 
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();  //hook do material para acesar o tema
    const smDown = useMediaQuery(theme.breakpoints.down('sm')); //detecta o tamanho da tela
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();  //dados e funções personalizados

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="/src/Image/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671122.jpg" />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => (
                                <ListItemButton>
                                    <ListItemLink
                                        key={drawerOption.path}
                                        icon={drawerOption.icon}
                                        to={drawerOption.path}
                                        label={drawerOption.label}
                                        onClick={smDown ? toggleDrawerOpen : undefined}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
}

