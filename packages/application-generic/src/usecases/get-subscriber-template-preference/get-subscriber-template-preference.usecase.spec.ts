import {
  determineOverrides,
  filterActiveChannels,
  filterActiveOverrides,
} from './get-subscriber-template-preference.usecase';
import { ChannelTypeEnum } from '@novu/shared';
import { IPreferenceOverride } from '../get-subscriber-preference';

describe('determineOverrides', function () {
  beforeEach(function () {});

  it('should be overridden by the subscribers preference', async function () {
    const templateChannelPreference = {
      email: false,
      sms: true,
      in_app: true,
      chat: true,
      push: true,
    };
    const subscriberChannelPreference = {
      email: true,
      sms: true,
      push: false,
    };

    const { preferences, overrides } = determineOverrides({
      template: templateChannelPreference,
      subscriber: subscriberChannelPreference,
    });

    const expectedPreferenceResult = {
      email: true,
      sms: true,
      in_app: true,
      chat: true,
      push: false,
    };

    expect(preferences).toEqual(expectedPreferenceResult);
    expect(
      overrides.find((override) => override.channel === 'email').source
    ).toEqual('subscriber');
    expect(
      overrides.find((override) => override.channel === 'sms').source
    ).toEqual('subscriber');
    expect(
      overrides.find((override) => override.channel === 'in_app').source
    ).toEqual('template');
    expect(
      overrides.find((override) => override.channel === 'chat').source
    ).toEqual('template');
    expect(
      overrides.find((override) => override.channel === 'push').source
    ).toEqual('subscriber');
  });

  it('should get preference from template when subscriber preference are empty', async function () {
    const templateChannelPreference = {
      email: false,
      sms: true,
      in_app: false,
      chat: true,
      push: true,
    };
    const subscriberChannelPreference = {};

    const { preferences, overrides } = determineOverrides({
      template: templateChannelPreference,
      subscriber: subscriberChannelPreference,
    });

    const expectedPreferenceResult = {
      email: false,
      sms: true,
      in_app: false,
      chat: true,
      push: true,
    };

    expect(preferences).toEqual(expectedPreferenceResult);
    expect(
      overrides.find((override) => override.channel === 'email').source
    ).toEqual('template');
    expect(
      overrides.find((override) => override.channel === 'sms').source
    ).toEqual('template');
    expect(
      overrides.find((override) => override.channel === 'in_app').source
    ).toEqual('template');
    expect(
      overrides.find((override) => override.channel === 'chat').source
    ).toEqual('template');
    expect(
      overrides.find((override) => override.channel === 'push').source
    ).toEqual('template');
  });
});

describe('filterActiveChannels', function () {
  it('should filter active channels in the preference ', async function () {
    const preferences = {
      email: false,
      sms: true,
      in_app: true,
      chat: true,
      push: true,
    };
    const activeChannels = [ChannelTypeEnum.IN_APP, ChannelTypeEnum.PUSH];

    const channelPreferences = filterActiveChannels(
      activeChannels,
      preferences
    );
    const expectedPreferenceResult = {
      in_app: true,
      push: true,
    };

    expect(Object.keys(channelPreferences).length).toEqual(2);
    expect(channelPreferences).toEqual(expectedPreferenceResult);
  });

  it('should filter all if no active channels ', async function () {
    const preferences = {
      email: false,
      sms: true,
      in_app: true,
      chat: true,
      push: true,
    };
    const activeChannels = [];

    const channelPreferences = filterActiveChannels(
      activeChannels,
      preferences
    );

    expect(Object.keys(channelPreferences).length).toEqual(0);
  });

  it('should not filter preference if all the channels are active', async function () {
    const preferences = {
      email: false,
      sms: true,
      in_app: true,
      chat: true,
      push: true,
    };
    const activeChannels = [
      ChannelTypeEnum.IN_APP,
      ChannelTypeEnum.PUSH,
      ChannelTypeEnum.SMS,
      ChannelTypeEnum.EMAIL,
      ChannelTypeEnum.CHAT,
    ];

    const channelPreferences = filterActiveChannels(
      activeChannels,
      preferences
    );
    const expectedPreferenceResult = {
      email: false,
      sms: true,
      in_app: true,
      chat: true,
      push: true,
    };

    expect(Object.keys(channelPreferences).length).toEqual(5);
    expect(channelPreferences).toEqual(expectedPreferenceResult);
  });
});

describe('filterActiveOverrides', function () {
  it('should filter active channels in the overrides ', async function () {
    const override: IPreferenceOverride[] = [
      { channel: ChannelTypeEnum.EMAIL, source: 'subscriber' },
      { channel: ChannelTypeEnum.SMS, source: 'subscriber' },
      { channel: ChannelTypeEnum.IN_APP, source: 'subscriber' },
      { channel: ChannelTypeEnum.CHAT, source: 'subscriber' },
      { channel: ChannelTypeEnum.PUSH, source: 'subscriber' },
    ];
    const activeChannels = [ChannelTypeEnum.IN_APP, ChannelTypeEnum.PUSH];

    const channelPreferences = filterActiveOverrides(activeChannels, override);

    const expectedPreferenceResult = [
      { channel: ChannelTypeEnum.IN_APP, source: 'subscriber' },
      { channel: ChannelTypeEnum.PUSH, source: 'subscriber' },
    ];

    expect(Object.keys(channelPreferences).length).toEqual(2);
    expect(channelPreferences).toEqual(expectedPreferenceResult);
  });

  it('should filter all if no active channels ', async function () {
    const override: IPreferenceOverride[] = [
      { channel: ChannelTypeEnum.EMAIL, source: 'subscriber' },
      { channel: ChannelTypeEnum.SMS, source: 'subscriber' },
      { channel: ChannelTypeEnum.IN_APP, source: 'subscriber' },
      { channel: ChannelTypeEnum.CHAT, source: 'subscriber' },
      { channel: ChannelTypeEnum.PUSH, source: 'subscriber' },
    ];
    const activeChannels = [];

    const channelPreferences = filterActiveOverrides(activeChannels, override);

    const expectedPreferenceResult = [];

    expect(Object.keys(channelPreferences).length).toEqual(0);
  });

  it('should not filter preference if all the channels are active', async function () {
    const override: IPreferenceOverride[] = [
      { channel: ChannelTypeEnum.EMAIL, source: 'subscriber' },
      { channel: ChannelTypeEnum.SMS, source: 'subscriber' },
      { channel: ChannelTypeEnum.IN_APP, source: 'subscriber' },
      { channel: ChannelTypeEnum.CHAT, source: 'subscriber' },
      { channel: ChannelTypeEnum.PUSH, source: 'subscriber' },
    ];
    const activeChannels = [
      ChannelTypeEnum.IN_APP,
      ChannelTypeEnum.PUSH,
      ChannelTypeEnum.SMS,
      ChannelTypeEnum.EMAIL,
      ChannelTypeEnum.CHAT,
    ];

    const channelPreferences = filterActiveOverrides(activeChannels, override);

    const expectedPreferenceResult = [
      { channel: ChannelTypeEnum.EMAIL, source: 'subscriber' },
      { channel: ChannelTypeEnum.SMS, source: 'subscriber' },
      { channel: ChannelTypeEnum.IN_APP, source: 'subscriber' },
      { channel: ChannelTypeEnum.CHAT, source: 'subscriber' },
      { channel: ChannelTypeEnum.PUSH, source: 'subscriber' },
    ];

    expect(Object.keys(channelPreferences).length).toEqual(5);
    expect(channelPreferences).toEqual(expectedPreferenceResult);
  });
});
