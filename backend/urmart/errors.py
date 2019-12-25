class APIError(Exception):
    code = ''
    message = ''

    def serialize(self):
        return {
            'code': self.code,
            'message': self.message
        }


class InvalidFormat(APIError):
    code = '400-000'
    message = '格式不合法'


class ProductNotFound(APIError):
    code = '400-001'
    message = '商品不存在'


class CustomerNotMeetRequirements(APIError):
    code = '400-002'
    message = '客戶不符合要求'


class ShortageOfStock(APIError):
    code = '400-003'
    message = '庫存不足'


class OrderNotFound(APIError):
    code = '400-004'
    message = '訂單不存在'


class TopicNotSupported(APIError):
    code = '400-005'
    message = '任務 topic 不支援'
