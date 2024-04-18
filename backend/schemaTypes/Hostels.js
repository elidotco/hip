export default {
  name: 'hostels',
  title: 'Hostels',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Hostel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'available',
      title: 'Available/yes or no',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured/yes or no',
      type: 'string',
    },
    {
      name: 'campus',
      title: 'Campus/ yes or no',
      type: 'string',
    },
    {
      name: 'distance',
      title: 'Distance',
      type: 'number',
    },
    {
      name: 'mapping',
      title: 'Mapping',
      type: 'document',
      fields: [
        {
          name: 'lat',
          title: 'latitude',
          type: 'string',
        },
        {
          name: 'lon',
          title: 'longitude',
          type: 'string',
        },
      ],
    },
    {
      name: 'cover_image',
      title: 'Cover Image',
      type: 'image',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'phone_number',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'room_types',
      title: 'Room types',
      type: 'array',
      of: [
        {
          name: 'type',
          title: 'Room Type',
          type: 'document',
          fields: [
            {
              name: 'type',
              title: 'Room type',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Room Price',
              type: 'number',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
    },
  ],
}
