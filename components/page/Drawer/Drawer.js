import React from 'react'
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { 
  ScorsIcon, 
  TestIcon, 
  ModelsIcon, 
  SettingsIcon, 
  SchedulingIcon
} from "../../../assets/CustomIcons";
import ScidashLogo from '../../../assets/scidash_logo.png';
import PagesService from '../../../services/PagesService';

export default ({ drawerActive, changePage, toggleDrawer }) => {
  const pagesService = new PagesService()
  return (
    <div>
      <IconButton
          id="hamMenu"
          onClick={() => toggleDrawer()}
        >
          <NavigationMenu />
      </IconButton>
      <Drawer
        width={265}
        docked={false}
        open={drawerActive}
        onRequestChange={() => toggleDrawer()}
      >
        <img style={styles.logo} src={ScidashLogo} />
        <Divider />
          <MenuItem 
            id="hamMenuScores"
            primaryText="Scores"
            leftIcon={<SvgIcon>{ScorsIcon}</SvgIcon>}
            onClick={() => changePage(pagesService.SCORES_PAGE)}
          />
          <MenuItem 
            id="hamMenuTests"
            primaryText="Tests"
            onClick={() => changePage(pagesService.TESTS_PAGE)}
            leftIcon={<SvgIcon>{TestIcon}</SvgIcon>}
          />
          <MenuItem 
            id="hamMenuModels"
            primaryText="Models"
            onClick={() => changePage(pagesService.MODELS_PAGE)}
            leftIcon={<SvgIcon>{ModelsIcon}</SvgIcon>}
          />
          <MenuItem 
            id="hamMenuSettings"
            primaryText="Settings"
            leftIcon={<SvgIcon>{SettingsIcon}</SvgIcon>}
            onClick={() => changePage(pagesService.SETTINGS_PAGE)}
            
          />
          <MenuItem 
            id="hamMenuScheduling"
            primaryText="Scheduling"
            leftIcon={<SvgIcon>{SchedulingIcon}</SvgIcon>}
            onClick={() => changePage(pagesService._SCHEDULER_PAGE)}
          />
      </Drawer>
    </div>
  )
  
}

const styles = {
  logo: {
    width: 205,
    marginTop: 5,
    marginLeft: 25,
    marginBottom: 8,
  },
}