function payloadGenerator(user) {
  const {
    user_id,
    first_name,
    last_name,
    email,
    country,
    state,
    city,
    zip,
    address,
    contact_number,
  } = user;

  return {
    userId: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    country: user.country,
    state: user.state,
    city: user.city,
    zip: user.zip,
    address: user.address,
    contactNumber: user.contact_number,
  };
}

module.exports = payloadGenerator;
