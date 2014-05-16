define(['./module'], function (module) {
  module.controller('MainMenuController', [
    '$scope',
    'Global',
    function ($scope, Global) {
      if (!Global.authenticated) {
        // display only authentication links if user is not logged yet
        $scope.authMenu = [
          {
            icon: 'icon-plus',
            link: '/signup',
            text: 'Signup'
          },
          {
            icon: 'icon-signin',
            link: '/signin',
            text: 'Signin'
          }
        ];
      } else {
        $scope.menu = [
          {
            icon: 'icon-tasks',
            text: 'Attributes',
            link: '#!/attributes'
          },
          {
            icon: 'icon-file-alt',
            text: 'Conditions',
            link: '#!/conditions'
          },
          {
            icon: 'icon-beaker',
            text: 'Procedures',
            link: '#!/procedures'
          },
          {
            icon: 'icon-beaker',
            text: 'Organizations',
            link: '#!/organizations'
          },
          {
            icon: 'icon-book',
            text: 'Patients',
            link: '#!/patients'
          }
        ];
        /**
         {
           icon: 'icon-eye-open',
           link: '#!/',
           text: 'Discover'
         },
         {
           icon: 'icon-beaker',
           link: '#',
           text: 'UI kit',
           subMenu: [
             {
               link: '#!/buttons.html',
               text: 'Buttons'
             },
             {
               badge: 302,
               link: '#!/icons.html',
               text: 'Icons'
             }
           ]
         },
         {
           badge: {
             text: 2
           },
           icon: 'icon-file-text',
           href: '#',
           text: 'Pages',
           subMenu: [
             {
               href: '#!/dashboard.html',
               text: 'Dashboard'
             }
           ]
         },
         {
           badge: {
             text: 3,
             active: true
           },
           icon: 'icon-envelope-alt',
           link: '#!/mail.html',
           text: 'Mail'
         }
         */
      }
    }]);
});
