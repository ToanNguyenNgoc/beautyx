import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import ListReflect from "pages/ReflectSocialOrganization/components/ListReflect";
import Reception from "pages/ReflectSocialOrganization/components/Reception";

function ReflectSocialOrganization() {
    const location = useLocation(); 

    const isListPage = location.pathname.endsWith("/list");

    return (
        <Container>{isListPage ? <ListReflect /> : <Reception />}</Container>
    );
}

export default ReflectSocialOrganization;
