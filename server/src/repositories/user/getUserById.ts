import User from '../../models/user.model';

const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    return { user: undefined };
  }
  return { user };
};

export default getUserById;
