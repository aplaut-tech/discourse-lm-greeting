// import CreateTopicButton from 'discourse/components/create-topic-button';
import ApplicationRoute from 'discourse/routes/application';
import DiscoveryCategoriesRoute from 'discourse/routes/discovery-categories';
import DiscoveryRoute from 'discourse/routes/discovery';
import showModal from 'discourse/lib/show-modal';


export default {
  name: 'lm-onboarding',

  initialize(container) {

    ApplicationRoute.reopen({
      handleShowLogin () {
        showModal('sso-login');
      }
    });


    const createTopicFactory = function (controller_name) {
      return function () {
        const user = Discourse.User.current();

        if (user) {
          const controller = this.controllerFor(controller_name);
          this.openComposer(controller);
        } else {
          this.send('showLogin');
        }
      };
    };

    DiscoveryRoute.proto().actions.createTopic = createTopicFactory('discovery/topics');
    DiscoveryCategoriesRoute.proto().actions.createTopic = createTopicFactory('discovery/categories');

  }
};
