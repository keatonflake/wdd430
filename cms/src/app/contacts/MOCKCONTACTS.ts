import { Contact } from './contact.model';

export const MOCKCONTACTS: Contact[] = [
  // individual contacts
  // index 0
  {
    id: '1',
    name: 'Rex Barzee',
    email: 'barzeer@byui.edu',
    phone: '208-496-3768',
    imagePath: 'images/barzeer.jpg',
    group: null
  },
  // index 1
  {
    id: '2',
    name: 'Bradley Armstrong',
    email: 'armstrongb@byui.edu',
    phone: '208-496-3766',
    imagePath: 'images/armstrongb.jpg',
    group: null
  },
  // index 2
  {
    id: '3',
    name: 'Lee Barney',
    email: 'barneyl@byui.edu',
    phone: '208-496-3767',
    imagePath: 'images/barneyl.jpg',
    group: null
  },
  // index 3
  {
    id: '5',
    name: 'Kory Godfrey',
    email: 'godfreyko@byui.edu',
    phone: '208-496-3770',
    imagePath: 'images/godfreyko.jpg',
    group: null
  },
  // index 4
  {
    id: '7',
    name: 'R. Kent Jackson',
    email: 'jacksonk@byui.edu',
    phone: '208-496-3771',
    imagePath: 'images/jacksonk.jpg',
    group: null
  },
  // index 5
  {
    id: '8',
    name: 'Craig Lindstrom',
    email: 'lindstromc@byui.edu',
    phone: '208-496-3769',
    imagePath: 'images/lindstromc.jpg',
    group: null
  },
  // index 6
  {
    id: '9',
    name: 'Michael McLaughlin',
    email: 'mclaughlinm@byui.edu',
    phone: '208-496-3772',
    imagePath: 'images/mclaughlinm.jpg',
    group: null
  },
  // index 7
  {
    id: '11',
    name: 'Brent Morring',
    email: 'morringb@byui.edu',
    phone: '208-496-3778',
    imagePath: 'images/morringb.jpg',
    group: null
  },
  // index 8
  {
    id: '12',
    name: 'Mark Olaveson',
    email: 'olavesonm@byui.edu',
    phone: '208-496-3773',
    imagePath: 'images/olavesonm.jpg',
    group: null
  },
  // index 9
  {
    id: '13',
    name: 'Steven Rigby',
    email: 'rigbys@byui.edu',
    phone: '208-496-3774',
    imagePath: 'images/rigbys.jpg',
    group: null
  },
  // index 10
  {
    id: '15',
    name: 'Blaine Robertson',
    email: 'robertsonb@byui.edu',
    phone: '208-496-3775',
    imagePath: 'images/robertsonb.jpg',
    group: null
  },
  // index 11
  {
    id: '16',
    name: 'Randy Somsen',
    email: 'somsenr@byui.edu',
    phone: '208-496-3776',
    imagePath: 'images/somsenr.jpg',
    group: null
  },
  // index 12
  {
    id: '17',
    name: 'Shane Thompson',
    email: 'thompsonda@byui.edu',
    phone: '208-496-3776',
    imagePath: 'images/thompsonda.jpg',
    group: null
  },

  // teams
  // index 13
  {
    id: '4', name: 'Network/OS team', email: ' ', phone: ' ', imagePath: ' ', group: [
      {
        id: '2',
        name: 'Bradley Armstrong',
        email: 'armstrongb@byui.edu',
        phone: '208-496-3766',
        imagePath: 'images/armstrongb.jpg',
        group: null
      },
      {
        id: '12',
        name: 'Mark Olaveson',
        email: 'olavesonm@byui.edu',
        phone: '208-496-3773',
        imagePath: 'images/olavesonm.jpg',
        group: null
      },
      {
        id: '13',
        name: 'Steven Rigby',
        email: 'rigbys@byui.edu',
        phone: '208-496-3774',
        imagePath: 'images/rigbys.jpg',
        group: null
      }
    ]
  },

  // index 14
  {
    id: '6', name: 'Software Development team', email: ' ', phone: ' ', imagePath: ' ', group: [
      {
        id: '1',
        name: 'Rex Barzee',
        email: 'barzeer@byui.edu',
        phone: '208-496-3768',
        imagePath: 'images/barzeer.jpg',
        group: null
      },
      {
        id: '3',
        name: 'Lee Barney',
        email: 'barneyl@byui.edu',
        phone: '208-496-3767',
        imagePath: 'images/barneyl.jpg',
        group: null
      },
      {
        id: '7',
        name: 'R. Kent Jackson',
        email: 'jacksonk@byui.edu',
        phone: '208-496-3771',
        imagePath: 'images/jacksonk.jpg',
        group: null
      },
      {
        id: '12',
        name: 'Mark Olaveson',
        email: 'olavesonm@byui.edu',
        phone: '208-496-3773',
        imagePath: 'images/olavesonm.jpg',
        group: null
      }
    ]
  },

  // index 15
  {
    id: '10', name: 'Web Development team', email: ' ', phone: ' ', imagePath: ' ', group: [
      {
        id: '15',
        name: 'Blaine Robertson',
        email: 'robertsonb@byui.edu',
        phone: '208-496-3775',
        imagePath: 'images/robertsonb.jpg',
        group: null
      },
      {
        id: '16',
        name: 'Randy Somsen',
        email: 'somsenr@byui.edu',
        phone: '208-496-3776',
        imagePath: 'images/somsenr.jpg',
        group: null
      },
      {
        id: '17',
        name: 'Shane Thompson',
        email: 'thompsonda@byui.edu',
        phone: '208-496-3776',
        imagePath: 'images/thompsonda.jpg',
        group: null
      }
    ]
  },

  // index 16
  {
    id: '14', name: 'Database team', email: ' ', phone: ' ', imagePath: ' ', group: [
      {
        id: '7',
        name: 'R. Kent Jackson',
        email: 'jacksonk@byui.edu',
        phone: '208-496-3771',
        imagePath: 'images/jacksonk.jpg',
        group: null
      },
      {
        id: '9',
        name: 'Michael McLaughlin',
        email: 'mclaughlinm@byui.edu',
        phone: '208-496-3772',
        imagePath: 'images/mclaughlinm.jpg',
        group: null
      },
      {
        id: '11',
        name: 'Brent Morring',
        email: 'morringb@byui.edu',
        phone: '208-496-3778',
        imagePath: 'images/morringb.jpg',
        group: null
      }
    ]
  },

  // index 17
  {
    id: '18', name: 'Computer Security team', email: ' ', phone: ' ', imagePath: ' ', group: [
      {
        id: '5',
        name: 'Kory Godfrey',
        email: 'godfreyko@byui.edu',
        phone: '208-496-3770',
        imagePath: 'images/godfreyko.jpg',
        group: null
      },
      {
        id: '8',
        name: 'Craig Lindstrom',
        email: 'lindstromc@byui.edu',
        phone: '208-496-3769',
        imagePath: 'images/lindstromc.jpg',
        group: null
      },
      {
        id: '13',
        name: 'Steven Rigby',
        email: 'rigbys@byui.edu',
        phone: '208-496-3774',
        imagePath: 'images/rigbys.jpg',
        group: null
      }
    ]
  }
];
