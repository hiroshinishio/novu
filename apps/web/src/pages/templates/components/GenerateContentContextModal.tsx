import { Alert, Group, Modal, useMantineTheme } from '@mantine/core';
import { WarningOutlined } from '@ant-design/icons';
import { Button, colors, shadows, Title, Text } from '../../../design-system';

export function GenerateContentContextModal({
  target,
  description,
  isOpen,
  cancel,
  confirm,
  confirmButtonText = 'Yes',
  cancelButtonText = 'No',
  isLoading,
  error,
}: {
  description: string;
  target?: string;
  isOpen: boolean;
  cancel: () => void;
  confirm: () => void;
  isLoading?: boolean;
  error?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}) {
  const theme = useMantineTheme();
  const targetText = target ? ' ' + target : '';

  return (
    <>
      <Modal
        opened={isOpen}
        overlayColor={theme.colorScheme === 'dark' ? colors.BGDark : colors.BGLight}
        overlayOpacity={0.7}
        styles={{
          modal: {
            backgroundColor: theme.colorScheme === 'dark' ? colors.B15 : colors.white,
          },
          body: {
            paddingTop: '5px',
          },
          inner: {
            paddingTop: '180px',
          },
        }}
        title={<Title size={2}>Provide context</Title>}
        sx={{ backdropFilter: 'blur(10px)' }}
        shadow={theme.colorScheme === 'dark' ? shadows.dark : shadows.medium}
        radius="md"
        size="lg"
        onClose={() => {
          cancel();
        }}
      >
        <div>
          {error && (
            <Alert
              icon={<WarningOutlined size={16} />}
              title="An error occurred!"
              color={`linear-gradient(0deg, ${colors.B17} 0%, ${colors.B17} 100%)`}
              mb={32}
            >
              {error}
            </Alert>
          )}
          <Text>{description}</Text>
          <Group position="right">
            <Button variant="outline" size="md" mt={30} onClick={() => cancel()}>
              {cancelButtonText}
            </Button>
            <Button mt={30} size="md" onClick={() => confirm()} loading={isLoading} data-autofocus>
              {confirmButtonText}
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
}
