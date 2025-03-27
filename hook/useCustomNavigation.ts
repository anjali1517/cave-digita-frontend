import { useNavigation } from '@react-navigation/native';
import { RootStackParamsList } from '../types/RootStackList';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

const useCustomNavigation = <T extends keyof RootStackParamsList>(screenName: T) => {
  type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList, T>;
  const navigation = useNavigation<ScreenNavigationProp>(); // Correctly casting navigation type
  return navigation;
};

export default useCustomNavigation;
