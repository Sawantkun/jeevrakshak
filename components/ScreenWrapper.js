import { View, StatusBar, Platform } from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (

      <View style={{paddingTop:30}} >
        {children}
      </View>
  );
};

export default ScreenWrapper;
