import { useContext } from "react";

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  IconButton,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "src/contexts/SidebarContext";

//import icons
import ChatTwoToneIcon from "@mui/icons-material/ChatTwoTone";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useFriendList } from "src/contexts/FriendContext";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { enqueueSnackbar } from "notistack";
import { useTabs } from "src/contexts/TabsContext";
import { TabsEnum } from "src/utils/enums";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      margin: 0;           
      padding: 0;
      width: 100%;

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            padding-block: 4px;
            color: ${theme.colors.alpha.trueWhite[100]};
            font-size: ${theme.typography.pxToRem(26)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-inline: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active {
            background-color: ${alpha(theme.colors.alpha.black[100], 0.5)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }

          &:hover {
            background-color: ${alpha(theme.colors.alpha.black[100], 0.2)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const {
    tabs,
    setTabs,
    setShowChatBoxList,
    setShowChatDetail,
    setShowContactInfo,
    setShowContactList,
  } = useTabs();

  const handleChatClick = () => {
    // closeSidebar();
    setTabs(TabsEnum.CHAT);
    setShowChatBoxList(true);
    setShowChatDetail(true);
    setShowContactInfo(false);
    setShowContactList(false);
  };

  const handleContactClick = () => {
    // closeSidebar();
    setTabs(TabsEnum.CONTACT);
    setShowChatBoxList(false);
    setShowChatDetail(false);
    setShowContactInfo(true);
    setShowContactList(true);
  }

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div" sx={{ marginBottom: 2 }} >
                <Button
                  className={tabs === TabsEnum.CHAT ? 'active' : ''}
                  disableRipple
                  // component={RouterLink}
                  onClick={handleChatClick}
                  // to="/"
                  startIcon={<ChatTwoToneIcon />}
                ></Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  className={tabs === TabsEnum.CONTACT ? 'active' : ''}
                  disableRipple
                  // component={RouterLink}
                  onClick={handleContactClick}
                  // to="/contact"
                  startIcon={<ContactsIcon />}
                ></Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
