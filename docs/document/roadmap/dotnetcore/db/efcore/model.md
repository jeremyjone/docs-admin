# 模型

Entity Framework Core 使用一组约定来根据实体类的形状生成模型。可指定其他配置以补充或替代约定的内容。模型对应于数据库中的表，每一张数据表都应该对应一个数据模型。

::: tip 示例代码
完整代码可以看 [示例代码](https://github.com/jeremyjone/dotnet-study-road/tree/master/Database/Database.ModelBase)
:::

## 通过 fluent API 配置模型

在派生的上下文中替代 `OnModelCreating` 方法，并使用 ModelBuilder API 来配置模型，此配置方法最为有效，并且可在不修改是提累的情况下指定配置。

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            // 用户名是必须的
            .Property(user => user.Username)
            .IsRequired();
    }
}
```

### 配置多个属性

```csharp
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            // 用户名是必须的
            entity.Property(e => e.Username)
                .IsRequired();

            // 部门 Id 是必须的
            entity.Property(e => e.DepartId)
                .IsRequired();
        })
    }
}
```

### 分组配置

甚至可以通过分组，对多个配置封装到单独的类中，新建一个 `UserEntityTypeConfiguration.cs` 文件，并添加如下内容：

```csharp
public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            // 用户名是必须的
            .Property(user => user.Username)
            .IsRequired();
    }
}
```

在 `OnModelCreating` 中调用 `Configure` 方法，并进行配置：

```csharp
new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserEntityTypeConfiguration).Assembly);
```

## 通过数据注释配置模型

有时候我们在定义模型时就可以对属性进行约束，这种方式更加清晰。

::: warning
数据注释的方式会被 fluent API 配置替代。
:::

在 `Username` 属性上面添加 `[Required]`，其作用与上面示例一致。

```csharp{11}
public class User
{
    /// <summary>
    /// 用户 Id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// 用户名
    /// </summary>
    [Required]
    public string Username { get; set; }

    /// <summary>
    /// 用户昵称
    /// </summary>
    public string Nickname { get; set; }

    /// <summary>
    /// 用户所在部门
    /// </summary>
    public int DepartId { get; set; }
}
```

### 一些实体的数据注释

下面是一些常用的数据注释方法，基于 SQL Server，其他数据库设置大体相同，有差别请自行查找。

#### 设置表名

```csharp{1}
[Table("users")]
public class User
{
}
```

#### 不希望在模型中包含某一属性

```csharp{1,4}
[NotMapped]
public class UserMetadata
{
    [NotMapped]
    public DateTime PostTime { get; set; }
}
```

```csharp{3}
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Ignore<UserMetadata>();
}
```

该数据属性在类型和属性上均可使用。

#### 必须值

```csharp{3}
public class User
{
    [Required]
    public int Id { get; set; }
}
```

#### 设置列名

```csharp{3}
public class User
{
    [Column("d_id")]
    public int DepartId { get; set; }
}
```

#### 设置列的数据类型

```csharp{3}
public class User
{
    [Column(TypeName = "varchar(20)")]
    public string Username { get; set; }
}
```

#### 设置最大长度

```csharp{3}
public class User
{
    [MaxLength(20)]
    public string Username { get; set; }
}
```

#### 配置主键

默认情况下使用 `Id` 或者 `**Id`(如 MyId) 的字段配置为主键，也可以通过数据注释来自定义主键：

```csharp{3}
public class User
{
    [Key]
    public int Id { get; set; }
}
```

#### 配置索引

```csharp{1}
[Index(nameof(Username))]
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
}
```

复合索引：

```csharp{1}
[Index(nameof(Id), nameof(Username))]
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
}
```

唯一索引：

```csharp{1}
[Index(nameof(Username), IsUnique = true)]
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
}
```

设置索引名称：

```csharp{1}
[Index(nameof(Username), Name = "Index_Username")]
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
}
```

## 了解更多

了解更多内容，可以参考 [官方文档](https://docs.microsoft.com/zh-cn/ef/core/modeling/)
