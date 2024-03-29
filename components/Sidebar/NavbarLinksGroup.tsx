import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
  NavLink,
  Button,
} from '@mantine/core';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      color: theme.white,
    },
  },

  labelActive:{
    '&:active,&:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
        color: theme.white,
    },
  },

  chevron: {
    transition: 'transform 200ms ease',
  },
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  link?:string | ""
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links,link }: LinksGroupProps) {
  const [activeLink, setActiveLink] = useState('');
  const [labelActive,setLabelActive] = useState('')
  const { classes, theme,cx } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState( false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
   //change navlink instead of Text
    <Text
      component='p'
      key={link.label}
      className={cx(classes.link,{[classes.linkActive]:activeLink === link.label})}
      
      onClick={(event) => {event.preventDefault()
        setActiveLink(link.label);
        
      }}
    >
      <Link href={link.link}>{link.label}</Link>
    </Text>
  
  ));

  return (
    <>

      <UnstyledButton  onClick={() => {
        setOpened((o) => !o)
        setLabelActive(label)
      }}  className={cx("hover:bg-blue-600  block w-full font-medium py-3 px-4 ml-2 rounded-md overflow-hidden mb-2",{["hover:bg-blue-400"]:labelActive === label})}>
        <Group  position="apart" spacing={0} className='rounded-md'>
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml={"xs"}>
            <Link href={`${link}`}>
              <Text>{label}</Text>
            </Link>
            </Box>
                
              
             
            
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )}
        </Group>
        
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened} className='rounded-md'>{items}</Collapse> : null}

    </>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box
      sx={(theme) => ({
        minHeight: rem(220),
        padding: theme.spacing.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.green[6],
        borderRadius: theme.radius.md,
      
      })}
    >
      <LinksGroup {...mockdata} />
    </Box>
  );
}