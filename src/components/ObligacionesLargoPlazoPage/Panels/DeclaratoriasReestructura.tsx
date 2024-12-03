import { Grid, Tab, Tabs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SyntheticEvent, useState } from "react";
import { queries } from "../../../queries";
import { GastoCostos } from "./GastosCostos";
import { InformacionGeneral } from "./InformacionGeneral";
import { Declaratorias } from "./Declaratorias";
import { SolicitudReestructura } from "./Reestructura";

export function DeclaratoriasReestructura() {
    const query = {
        isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 478px)")
    };

    const [tabIndex, setTabIndex] = useState(0);
    const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
        setTabIndex(newTabIndex);
    };

    return (
        <Grid container direction="column">
            <Grid item width={"100%"}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Tabs
                    value={tabIndex}
                    onChange={handleChange}
                    centered={true}
                    //variant={query.isScrollable ? "scrollable" : "standard"}
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <Tab
                        label="Reestructura"
                        sx={queries.bold_text_InfoGeneralGastoCosto}
                    />
                    <Tab
                        label="Declaratorias"
                        sx={queries.bold_text_InfoGeneralGastoCosto}
                    />
                </Tabs>
            </Grid>
            {tabIndex === 0 && <SolicitudReestructura />}
            {tabIndex === 1 && <Declaratorias />}

        </Grid>
    );
}
